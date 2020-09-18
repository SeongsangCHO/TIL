#include <stdio.h>
#include <stdlib.h>

typedef struct	s_node
{
	double	   	  data;
	struct s_node *next;
}				t_node;

t_node	*create_node(int data)
{
	t_node *new;

	if(!(new = malloc(sizeof(t_node))))
		return (NULL);
	new->data = data;
	new->next = NULL;
	return (new);
}

void	delete_n(t_node **head)
{
	t_node *del;
	t_node *prev;
	
	del = *head;
	if (head == NULL)
		return;
	if (*head == NULL)
	{
		free(del);
		return ;
	}
	while (del)
	{
		prev = del;
		del = del->next;
		free(prev);
	}
}

void	add_node(t_node **head, int data)
{
	t_node *new;
	t_node *curr;
	
	if (head == NULL ||(!(new =create_node(data))))
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

double	find_max(t_node **head)
{
	t_node 	*find;
	double 	max;

	find = *head;
	max = -1;
	while (find)
	{
		if (find->data > max)
			max = find->data;
		find = find->next;
	}
	return (max);
	
}

int main(void)
{
	t_node 	*curr;
	t_node 	**head = malloc(sizeof(t_node));
	double 	n;
	int 	tmp;
	double 	*arr;
	double 	max;
	double	sum;

	sum = 0;
	*head = 0;
	scanf("%lf", &n);
	tmp = 0;
	max = 0;
	arr = malloc(sizeof(double) * n);
	while (n != 0)
	{
		scanf("%lf", arr + tmp);
		add_node(head, arr[tmp]);
		tmp++;
		n--;
	}
	curr = *head;
	max = find_max(head);
	while (curr)
	{
		curr->data = (curr->data / max) * 100;
		sum += curr->data;
		curr = curr->next;
	}
	sum /= tmp;
	printf("%lf",sum);
	delete_n(head);
}
