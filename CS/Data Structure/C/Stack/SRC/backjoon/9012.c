/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   9012.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/25 23:30:29 by secho             #+#    #+#             */
/*   Updated: 2020/04/26 07:35:02 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdio.h>
#include <stdlib.h>

int main(void)
{
	char data[50];
	int	 T;
	int	 result;
	int  idx;

	scanf("%d",&T);
	for(int i = 0; i < T; i++)
	{
		idx = 0;
		result = 0;
		scanf("%s",data);
		while(data[idx] != 0)
		{
			if(data[idx] == '(')
				result++;
			else if(data[idx] == ')')
			{
				result--;
				if(result < 0)
					break ;
			}
			idx++;
		}
		if(result == 0)
			printf("YES\n");
		else
			printf("NO\n");
	}
}
