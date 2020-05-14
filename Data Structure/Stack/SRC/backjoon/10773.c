/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   10773.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/25 22:59:41 by secho             #+#    #+#             */
/*   Updated: 2020/04/25 23:21:47 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdio.h>
#include <stdlib.h>

# define MAX_SIZE 100000

typedef struct s_stack
{
	int *data;
	int top;
}				t_stack;

t_stack	*stack_init(void)
{
	t_stack *stack;

	if(!(stack = malloc(sizeof(t_stack))))
		return (NULL);
	if(!(stack->data = malloc(sizeof(int) * MAX_SIZE)))
		return (NULL);
	stack->top = -1;
	return(stack);
}

void	push(t_stack *stack, int input)
{
	if(stack == NULL || stack->top + 1 >= MAX_SIZE)
		return ;
	stack->top++;
	stack->data[stack->top] = input;
	return ;
}

void	pop(t_stack *stack)
{
	if(stack == NULL || stack->top <= -1)
		return ;
	stack->data[stack->top] = 0;
	stack->top--;	
}

int		stack_sum(t_stack *stack, int k)
{
	int sum;
	
	sum = 0;
	k--;
	while(k != -1)
	{
		sum += stack->data[k];
		k--;
	}
	return (sum);
}
int main(void)
{
	int k;
	int data;
	t_stack *stack;

	stack = stack_init();
	scanf("%d", &k);
	for(int i = 0; i < k; i++)
	{
		scanf("%d", &data);
		if (data != 0)
			push(stack, data);
		else
			pop(stack);
	}
	printf("%d",stack_sum(stack, k));
	return (0);
}
