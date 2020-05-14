/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   2562.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/21 20:04:52 by secho             #+#    #+#             */
/*   Updated: 2020/04/21 21:52:21 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdio.h>
#include <stdlib.h>

typedef struct 	s_node
{
	int 			data;
	struct s_node	*next;
}				t_node;

t_node			*create_node(int data)
{
	t_node *new;

	if (!(new = malloc(sizeof(t_node))))
		return (NULL);
	new->data = data;
	new->next = NULL;
	return (new);
}

void			add_node(t_node **head, int data)
{
	t_node *new;
	t_node *curr;

	new = NULL;
	if (head == NULL || !(new = create_node(data)))
		return ;
	if (*head == NULL)
	{
		*head = new;
		return ;
	}
	curr = *head;
	while (curr->next)
		curr = curr->next;
	curr->next = new;
	return ;
}

void			list_clear(t_node **head, int n)
{
	t_node 	*curr;
	t_node 	*prev;
	int		idx;

	idx = 0;
	prev = NULL;
	curr = *head;
	if (head == NULL || *head == NULL)
		return ;
	if (n == 1)
	{
		*head = curr->next;
		free(curr);
		return ;
	}
	else
	{
		while (curr->next && idx < n - 1)
		{
			prev = curr;
			curr = curr->next;
			idx++;
		}
		if (curr->next == NULL)
		{
			free(curr);
			return ;
		}
		prev->next = curr->next;
		free(curr);
		return ;
	}
}

void			list_all_clear(t_node **head)
{
	t_node *curr;

	curr = *head;
	if (head == 0 || *head == 0)
		return ;
	while (curr->next)
	{
		list_clear(head, 1);
		curr = curr->next;
	}
	if (curr->next == NULL)
		list_clear(head, 1);
}

void			print_node(t_node **head)
{
	t_node *curr;

	curr = NULL;
	if (head == 0)
		return ;
	curr = *head;
	while (curr != NULL)
	{
		printf("%d\n",curr->data);
		curr = curr->next;
	}
}

int main(void)
{
	t_node 	**head = malloc(sizeof(t_node));
	t_node	*curr;
	int		arr[9];
	int		max;
	int		tmp;
	int		idx;

	max = -1;
	idx = 1;
	*head = 0;
	for (int i = 0; i < 9; i ++)
	{
		scanf("%d", arr + i);
		add_node(head, arr[i]);
	}
	curr = *head;
	while (curr)
	{
		tmp = curr->data;
		if (tmp > max)
			max = tmp;
		curr = curr->next;
	}
	curr = *head;
	while (curr)
	{
		if (curr->data == max)
			break ;
		idx++;
		curr = curr->next;
	}
	printf("%d\n%d",max,idx);
	list_all_clear(head);
}
